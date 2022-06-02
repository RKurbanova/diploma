package user

import (
	"server/internal/cource"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type Repo struct {
	DB *gorm.DB
}

func NewRepository(db *gorm.DB) *Repo {
	db.AutoMigrate(&cource.User{})

	return &Repo{DB: db}
}

func (repo *Repo) GetAll() ([]*cource.User, error) {
	users := []*cource.User{}
	result := repo.DB.Preload(clause.Associations).Find(&users)
	if result.Error != nil {
		return nil, result.Error
	}
	return users, nil
}

func (repo *Repo) GetByID(id uint) (*cource.User, error) {
	user := &cource.User{}
	err := repo.DB.Preload(clause.Associations).First(&user, "id = ?", id).Error
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (repo *Repo) GetByLogin(login string) (*cource.User, error) {
	user := &cource.User{}
	err := repo.DB.Preload(clause.Associations).First(&user, "login = ?", login).Error
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (repo *Repo) Create(user *cource.User) (*cource.User, error) {
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

func (repo *Repo) Update(elem *cource.User, toUpdate []string) (int64, error) {
	res := repo.DB.Model(&elem).Select(toUpdate).Updates(elem)
	if res.Error != nil {
		return 0, res.Error
	}
	return res.RowsAffected, nil
}

func (repo *Repo) Delete(id uint) (int64, error) {
	res := repo.DB.Delete(&cource.User{}, id)
	if res.Error != nil {
		return 0, res.Error
	}
	return res.RowsAffected, nil
}
