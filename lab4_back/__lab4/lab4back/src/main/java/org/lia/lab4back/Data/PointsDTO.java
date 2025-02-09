package org.lia.lab4back.Data;

import org.lia.lab4back.Entities.Point;

import java.io.Serializable;
import java.util.List;

public class PointsDTO implements Serializable {
    private boolean success;
    private List<Point> points;
    public PointsDTO() {}
    public PointsDTO(boolean success, List<Point> points) {
        this.success = success;
        this.points = points;
    }
    public boolean isSuccess() {
        return success;
    }
    public List<Point> getPoints() {
        return points;
    }
}
