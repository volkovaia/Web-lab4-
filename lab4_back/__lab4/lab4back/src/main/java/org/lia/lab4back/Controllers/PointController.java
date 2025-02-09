package org.lia.lab4back.Controllers;

import jakarta.ws.rs.*;
import org.lia.lab4back.Data.PointsDTO;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.MediaType;
import org.lia.lab4back.Entities.Point;
import org.lia.lab4back.Models.Auth;
import org.lia.lab4back.Models.PointCollection;

import javax.naming.AuthenticationException;
import java.util.List;

@Path("/points")
public class PointController {
    @Inject
    private PointCollection pointCollection;
    @Inject
    private Auth auth;

    @GET
    @Path("get")
    @Produces(MediaType.APPLICATION_JSON)
    public PointsDTO get_points() {
        try {
            List<Point> points = pointCollection.getPoints();
            return new PointsDTO(true, points);
        } catch (AuthenticationException e) {
            return new PointsDTO(false, null);
        }
    }

    @GET
    @Path("add")
    @Produces(MediaType.APPLICATION_JSON)
    public PointsDTO add_point(@QueryParam("x") Double x, @QueryParam("y") Double y, @QueryParam("r") Double r) {
        try {
            pointCollection.addPoint(x,y,r);
            List<Point> points = pointCollection.getPoints();
            return new PointsDTO(true, points);
        } catch (AuthenticationException e) {
            return new PointsDTO(false, null);
        }
    }
    @GET
    @Path("clear")
    @Produces(MediaType.APPLICATION_JSON)
    public PointsDTO clear() {
        try {
            pointCollection.clear();
            List<Point> points = pointCollection.getPoints();
            return new PointsDTO(true, points);
        } catch (AuthenticationException e) {
            return new PointsDTO(false, null);
        }
    }

}