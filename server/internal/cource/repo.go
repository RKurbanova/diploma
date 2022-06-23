package cource

import (
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type Repo struct {
	DB *gorm.DB
}

func NewRepository(db *gorm.DB) *Repo {
	db.AutoMigrate(&Cource{})
	db.AutoMigrate(&Rate{})
	db.AutoMigrate(&Lesson{})
	db.AutoMigrate(&Comment{})

	return &Repo{DB: db}
}

func (repo *Repo) GetAll() ([]*Cource, error) {
	cources := make([]*Cource, 0, 10)
	err := repo.DB.Preload(clause.Associations).Find(&cources).Error
	if err != nil {
		return nil, err
	}
	return cources, nil
}

func (repo *Repo) GetByID(id uint) (*Cource, error) {
	cource := &Cource{}
	err := repo.DB.Preload(clause.Associations).First(&cource, "id = ?", id).Error
	if err != nil {
		return nil, err
	}
	return cource, nil
}

func (repo *Repo) GetLessonByID(id uint) (*Lesson, error) {
	lesson := &Lesson{}
	err := repo.DB.Preload(clause.Associations).First(&lesson, "id = ?", id).Error
	if err != nil {
		return nil, err
	}
	return lesson, nil
}

func (repo *Repo) Create(elem *Cource) (uint, error) {
	err := repo.DB.Create(elem).Error
	if err != nil {
		return 0, err
	}
	return elem.ID, nil
}

func (repo *Repo) Update(elem *Cource, toUpdate []string) (int64, error) {
	res := repo.DB.Model(&elem).Select(toUpdate).Updates(elem)
	if res.Error != nil {
		return 0, res.Error
	}
	return res.RowsAffected, nil
}

func (repo *Repo) UpdateLesson(elem *Lesson, toUpdate []string) (int64, error) {
	res := repo.DB.Model(&elem).Select(toUpdate).Updates(elem)
	if res.Error != nil {
		return 0, res.Error
	}
	return res.RowsAffected, nil
}

func (repo *Repo) Delete(id int64) (int64, error) {
	res := repo.DB.Delete(&Cource{}, id)
	if res.Error != nil {
		return 0, res.Error
	}
	return res.RowsAffected, nil
}
