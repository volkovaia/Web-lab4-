package org.lia.lab4back.Session;

import jakarta.annotation.ManagedBean;
import jakarta.enterprise.context.SessionScoped;
import org.lia.lab4back.Entities.Point;
import org.lia.lab4back.Entities.User;

import javax.naming.AuthenticationException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@ManagedBean
@SessionScoped
public class UserData implements Serializable
{
    private User user;
    private List<Point> points;
    public UserData(){
        points = new ArrayList<>();
        user = null;
    }
    public User getUser() {
        return user;
    }
    public List<Point> getPoints() throws AuthenticationException {
        if (user != null) {
            return points;
        } else throw new AuthenticationException();
    }
    public void setUser(User user) {
        this.user = user;
    }

    public void setPoints(List<Point> points) {
        this.points = points;
    }
}
