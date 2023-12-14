package com.shamik.studentsystem.model;

import jakarta.persistence.*;

@Entity
@Table(name = "student")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "first_name")
    private String first_name;

    @Column(name = "last_name")
    private String last_name;

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    @Column(name = "branch")
    private String branch;

    @Column(name = "Roll_Number")
    private String rollNumber;

    @Column(name = "CGPA")
    private String cgpa;

    @Column(name = "total_credits")
    private String total_credits;

    @Column(name = "graduation_year")
    private String graduation_year;

    @Column(name = "photo_path")
     private String photoPath;
    public String getPhotoPath() {
        return photoPath;
    }
    public void setPhotoPath(String photoPath) {
        this.photoPath = photoPath;
    }

    public String getGraduation_year() {
        return graduation_year;
    }

    public void setGraduation_year(String graduation_year) {
        this.graduation_year = graduation_year;
    }

    public String getTotal_credits() {
        return total_credits;
    }

    public void setTotal_credits(String total_credits) {
        this.total_credits = total_credits;
    }

    public String getCgpa() {
        return cgpa;
    }

    public void setCgpa(String cgpa) {
        this.cgpa = cgpa;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }
    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
        updateRollNumber();
    }

    private void updateRollNumber() {
        String branchCode = branch.replaceAll("\\s+", "").toUpperCase().substring(0, 2);
        String currentYear = String.valueOf(java.time.LocalDate.now().getYear()).substring(2);
        String sequentialNumber = String.format("%03d", id);
        this.rollNumber = branchCode + currentYear + sequentialNumber;
    }
}
