package models

import (
	"time"
	// "gorm.io/gorm"
)

type Role string
type DefectStatus string

const (
	RoleManager  Role = "manager"
	RoleEngineer Role = "engineer"
	RoleViewer   Role = "viewer"

	StatusNew        DefectStatus = "new"
	StatusInProgress DefectStatus = "in_progress"
	StatusInReview   DefectStatus = "in_review"
	StatusClosed     DefectStatus = "closed"
	StatusCancelled  DefectStatus = "cancelled"
)

type User struct {
	ID        uint   `gorm:"primaryKey"`
	Email     string `gorm:"uniqueIndex;not null"`
	Password  string `gorm:"not null"` //hash
	FullName  string
	Role      Role `gorm:"type:varchar(20);default:'engineer'"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

type Project struct {
	ID          uint   `gorm:"primaryKey"`
	Name        string `gorm:"not null"`
	Description string
	CreatedAt   time.Time
	UpdatedAt   time.Time
}

type Defect struct {
	ID          uint         `gorm:"primaryKey"`
	Title       string       `gorm:"not null"`
	Description string       `gorm:"type:text"`
	Priority    int          `gorm:"default:3"`
	Status      DefectStatus `gorm:"type:varchar(30);default:'new'"`
	AssigneeID  *uint
	Assignee    *User `gorm:"foreignKey:AssigneeID"` // assigned to
	ProjectID   *uint
	Project     *Project
	CreatedByID uint
	CreatedBy   User
	DueDate     *time.Time
	CreatedAt   time.Time
	UpdatedAt   time.Time
}
