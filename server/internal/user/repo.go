package user

import (
	"server/internal/deal"

	"gorm.io/gorm"
)

type Repo struct {
	DB *gorm.DB
}

func NewRepository(db *gorm.DB) *Repo {
	db.AutoMigrate(&deal.User{})

	return &Repo{DB: db}
}

func (repo *Repo) GetAll() ([]*deal.User, error) {
	users := []*deal.User{}
	result := repo.DB.Find(&users)
	if result.Error != nil {
		return nil, result.Error
	}
	return users, nil
}

func (repo *Repo) GetByID(id uint) (*deal.User, error) {
	user := &deal.User{}
	err := repo.DB.First(&user, "id = ?", id).Error
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (repo *Repo) GetByLogin(login string) (*deal.User, error) {
	user := &deal.User{}
	err := repo.DB.First(&user, "login = ?", login).Error
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (repo *Repo) Create(user *deal.User) (*deal.User, error) {
	u, err := repo.GetByLogin(user.Login)

	if u != nil {
		return nil, ErrLoginExists
	}

	err = repo.DB.Create(user).Error

	if err != nil {
		return nil, err
	}

	return user, nil
}

func (repo *Repo) Update(elem *deal.User) (int64, error) {
	res := repo.DB.Model(&elem).Updates(elem)
	if res.Error != nil {
		return 0, res.Error
	}
	return res.RowsAffected, nil
}

func (repo *Repo) Delete(id uint) (int64, error) {
	res := repo.DB.Delete(&deal.User{}, id)
	if res.Error != nil {
		return 0, res.Error
	}
	return res.RowsAffected, nil
}
