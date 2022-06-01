package deal

import (
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type Repo struct {
	DB *gorm.DB
}

func NewRepository(db *gorm.DB) *Repo {
	db.AutoMigrate(&Deal{})
	db.AutoMigrate(&Approve{})
	db.AutoMigrate(&Rate{})
	db.AutoMigrate(&Comment{})
	db.AutoMigrate(&Stage{})
	db.AutoMigrate(&Investment{})

	return &Repo{DB: db}
}

func (repo *Repo) GetAll() ([]*Deal, error) {
	deals := make([]*Deal, 0, 10)
	err := repo.DB.Preload(clause.Associations).Find(&deals).Error
	if err != nil {
		return nil, err
	}
	return deals, nil
}

func (repo *Repo) GetByID(id uint) (*Deal, error) {
	deal := &Deal{}
	err := repo.DB.Preload(clause.Associations).First(&deal, "id = ?", id).Error
	if err != nil {
		return nil, err
	}
	return deal, nil
}

func (repo *Repo) Create(elem *Deal) (uint, error) {
	err := repo.DB.Create(elem).Error
	if err != nil {
		return 0, err
	}
	return elem.ID, nil
}

func (repo *Repo) UpdateStage(elem *Stage, toUpdate []string) (int64, error) {
	res := repo.DB.Model(&elem).Select(toUpdate).Updates(elem)
	if res.Error != nil {
		return 0, res.Error
	}
	return res.RowsAffected, nil
}

func (repo *Repo) Update(elem *Deal, toUpdate []string) (int64, error) {
	res := repo.DB.Model(&elem).Select(toUpdate).Updates(elem)
	if res.Error != nil {
		return 0, res.Error
	}
	return res.RowsAffected, nil
}

func (repo *Repo) Delete(id int64) (int64, error) {
	res := repo.DB.Delete(&Deal{}, id)
	if res.Error != nil {
		return 0, res.Error
	}
	return res.RowsAffected, nil
}
