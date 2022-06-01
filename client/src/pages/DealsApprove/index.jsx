import { Button, PageHeader, Space, Input, Tag, Rate, Menu, DatePicker, Typography, Spin } from "antd";
import { Link } from "react-router-dom";
import SmallDealCard from "../../components/SmallDealCard";
import { useGetAllDealsQuery } from '../../queries/deal';

import {
    SearchOutlined
  } from '@ant-design/icons';

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function DealsApprovePage({user}) {
    const {data, isLoading: isDealsLoading} = useGetAllDealsQuery()

    const deals = useMemo(() => {
        return data?.filter(({IsApproved, IsFinished, IsFrozen, IsStarted}) => !IsStarted && !IsFinished && !IsFrozen && !IsApproved)
    }, [data])

    const [isCheatLoading, setIsCheatLoading] = useState(false)
    const [filteredDeals, setFilteredDeals] = useState([])
    const [dateRange, setDateRange] = useState([undefined, undefined])

    const [filters, setCurrentFilters] = useState([]);
    const [search, setSearch] = useState('');
    const isLoading = isCheatLoading || isDealsLoading

    const updateData = useCallback(() => {
        if (!deals) {
            return
        }

        setIsCheatLoading(true)
        
        let newFilteredDeals = [...deals]
        
        const [firstDate, secondDate] = dateRange
        
        if (firstDate && secondDate) {
            newFilteredDeals = newFilteredDeals.filter(({FinishDate}) => {
                const date = new Date(FinishDate)
                
                return firstDate.toDate() < date && date < secondDate.toDate()
            })
        }
        
        newFilteredDeals = newFilteredDeals.filter(({Title, Description}) => {
            return Title.includes(search) || Description.includes(search)
        })
        
        newFilteredDeals = newFilteredDeals.filter(({Title, Description}) => {
            return Title.includes(search) || Description.includes(search)
        })
        
        const statusesToCheck = filters.filter((filter) => filter.includes('status'))
        .map(filter => filter.split('-')[1])
        
        newFilteredDeals = statusesToCheck.length ? newFilteredDeals.filter(({IsStarted, IsApproved, IsFrozen, IsFinished}) => {
            console.log()
            return (statusesToCheck.includes('started') && IsStarted) ||
            (statusesToCheck.includes('approved') && IsApproved) ||
            (statusesToCheck.includes('frozen') && IsFrozen) ||
            (statusesToCheck.includes('finished') && IsFinished) ||
            (statusesToCheck.includes('default') && !IsStarted && !IsApproved && !IsFrozen && !IsFinished)
        }) : newFilteredDeals
        
        const sort = filters.find((filter) => filter.includes('sort'))
        
        if (sort) {
            const direction = sort.split('-')[2]
            const numberComparator = (a, b) => direction === 'asc' ? a < b : a > b
            
            if (sort.includes('risk')) {
                newFilteredDeals.sort(({Rates: Rates1}, {Rates: Rates2}) => {
                    const rate1 =  Rates1.length ? Rates1.reduce((acc, {Rate}) => acc + Rate, 0) / Rates1.length : 0
                    const rate2 =  Rates2.length ? Rates2.reduce((acc, {Rate}) => acc + Rate, 0) / Rates2.length : 0
                    return numberComparator(rate1, rate2)
                })
            } else if (sort.includes('money')) {
                newFilteredDeals.sort(({Investments: Investments1}, {Investments: Investments2}) => {
                    const currentBalance1 = Investments1.reduce((acc, {Amount}) => acc + Amount, 0)
                    const currentBalance2 = Investments2.reduce((acc, {Amount}) => acc + Amount, 0)
                    return numberComparator(currentBalance1, currentBalance2)
                })
            } else if (sort.includes('inv')) {
                newFilteredDeals.sort(({Investors: Investors1}, {Investors: Investors2}) => {
                    return numberComparator(Investors1.length, Investors2.length)
                })
            }
        }
        
        setTimeout(() => {
            setFilteredDeals(newFilteredDeals)
            setIsCheatLoading(false)
        }, 200)
    }, [deals, dateRange, filters, search])

    const updateDataRef = useRef(updateData)

    useEffect(() => {
        updateDataRef.current = updateData
    }, [updateData])

    useEffect(() => {
        if (deals) {
            updateData()
        }
    }, [deals])

    const items = [
        {
            label: 'Статус',
            children: [
                {
                    label: <span style={{color: 'green'}}>Завершен</span>,
                    key: 'status-finished',
                },
                {
                    label: <span style={{color: 'blue'}}>Заморожен</span>,
                    key: 'status-frozen',
                },
                {
                    label: <span style={{color: 'green'}}>Подтвержден</span>,
                    key: 'status-approved',
                },
                {
                    label: <span style={{color: 'gray'}}>Ожидает подтверждения</span>,
                    key: 'status-default',
                },
                {
                    label: <span style={{color: 'green'}}>Начат</span>,
                    key: 'status-started',
                },
            ],
        },
        {
            label: 'Сортировать',
            children: [
                {
                    type: 'group',
                    label: 'По рейтингу рискованности',
                    children: [
                        {
                            label: 'По возрастанию',
                            key: 'sort-risk-asc',
                        },
                        {
                            label: 'По убыванию',
                            key: 'sort-risk-desc',
                        },
                    ],
                },
                {
                    type: 'group',
                    label: 'По количеству необходимых средств',
                    children: [
                        {
                            label: 'По возрастанию',
                            key: 'sort-money-asc',
                        },
                        {
                            label: 'По убыванию',
                            key: 'sort-money-desc',
                        },
                    ],
                },
                {
                    type: 'group',
                    label: 'По количеству инвесторов',
                    children: [
                        {
                            label: 'По возрастанию',
                            key: 'sort-inv-asc',
                        },
                        {
                            label: 'По убыванию',
                            key: 'sort-inv-desc',
                        },
                    ],
                },
            ],
        },
    ];

    const onSelect = ({key}) => {
        let newFilters = filters

        if (key.includes('sort')) {
            newFilters = newFilters.filter((oldkey) => !oldkey.includes('sort'))
        }

        setCurrentFilters([...newFilters, key])
    };

    const onDeselect = ({key}) => {
        const newFilters = filters.filter(oldKey => oldKey !== key)
        setCurrentFilters(newFilters)
    };

    return <Space style={{padding: '20px', width: '100%'}} direction='vertical'>
        <Space style={{justifyContent: 'space-between', width: '100%'}}>
            <PageHeader
                style={{padding: 0}}
                className="site-page-header"
                title={<span className="profile-header">Проекты и сделки для подтверждения</span>}
            />
            <Link to={`/`}><Button type='primary'>Все проекты и сделки</Button></Link>
        </Space>
        <Menu disabled={isLoading} multiple onSelect={onSelect} onDeselect={onDeselect} selectedKeys={filters} mode="horizontal" items={items} />
        <Input disabled={isLoading} value={search} onChange={(e) => setSearch(e.target.value)} size="large" placeholder="Поиск проектов или сделок" prefix={<SearchOutlined />} />
        <Space>
            <Typography.Paragraph style={{marginBottom: 0}} strong>
                Дата завершения
                {' '}
                <DatePicker.RangePicker value={dateRange} onChange={setDateRange}/>
            </Typography.Paragraph>
            <Button disabled={isLoading} onClick={() => {
                setIsCheatLoading(true)
                setDateRange([undefined, undefined])
                setCurrentFilters([])
                setSearch('')
                setTimeout(() => {
                    updateDataRef.current()
                }, 300)
            }}>Сбросить</Button>
            <Button disabled={isLoading} onClick={() => {
                updateData()
            }}>Применить</Button>
        </Space>
        {isLoading ? <Spin className="main-spinner" size="large" /> : <div className="dealsList">
            {filteredDeals?.map(deal => <SmallDealCard key={deal.ID} deal={deal} />)}
        </div>}
        {
            filteredDeals && !filteredDeals.length && !isLoading ? 'Проекты или сделки не найдены' : null
        }
    </Space>;
}
