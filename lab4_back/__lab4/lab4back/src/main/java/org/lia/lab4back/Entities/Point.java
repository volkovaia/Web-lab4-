package org.lia.lab4back.Entities;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;

@Entity
@Table(name="points")
public class Point implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private final double x;
    private final double y;
    private final double r;
    private boolean res;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setRes(boolean res) {
        this.res = res;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public boolean isRes() {
        return res;
    }

    public Point(){
        this.x = 0;
        this.y = 0;
        this.r = 0;
        calculateRes();
    }
    public Point(double x, double y, double r, User user){
        this.x = x;
        this.y = y;
        this.r = r;
        this.user = user;
        calculateRes();
    }
    public Point(double x, double y, double r, boolean res,User user){
        this.x = x;
        this.y = y;
        this.r = r;
        this.res = res;
        this.user = user;
    }

    public void calculateRes(){
        if(this.x >= 0 && this.y >= 0)this.res = x*x+y*y <= r*r;
        else if(this.x <= 0 && this.y >= 0)this.res = y<=r+2*x;
        else if(this.x >= 0 && this.y <= 0)this.res = x <= r && y >= -r/2;
        else this.res =  false;
    }
}
