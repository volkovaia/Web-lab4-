package org.lia.lab4back.Models;

import jakarta.ejb.Stateless;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.lia.lab4back.Entities.Point;
import org.lia.lab4back.Services.PointRepository;
import org.lia.lab4back.Session.UserData;
import java.util.List;
import javax.naming.AuthenticationException;
import java.util.Set;

@Stateless
public class PointCollection {
    @Inject
    private PointRepository pointRepo;
    @Inject
    private UserData userData;

    public void refresh() throws AuthenticationException {
        userData.getPoints().clear();
        if (userData.getUser() != null) {
            Set<Point> userpoints = userData.getUser().getPoints();
            if (userpoints != null) userData.getPoints().addAll(userpoints);
        }
    }
    public void addPoint(double x, double y, double r) throws AuthenticationException {
        if (userData.getUser() != null) {
            Point point = new Point(x, y, r, userData.getUser());
            pointRepo.save(point);
            userData.getPoints().add(point);
        } else throw new AuthenticationException();
    }
    public void clear() throws AuthenticationException {
        if (userData.getUser() != null) {
            pointRepo.removePointByUser(userData.getUser());
            userData.getPoints().clear();
        } else throw new AuthenticationException();
    }
    public List<Point> getPoints() throws AuthenticationException {
        return userData.getPoints();
    }
}

