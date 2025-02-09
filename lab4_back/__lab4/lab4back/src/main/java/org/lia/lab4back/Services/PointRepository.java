package org.lia.lab4back.Services;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.lia.lab4back.Entities.User;
import org.lia.lab4back.Entities.Point;

import java.io.Serializable;

@Stateless
public class PointRepository implements Serializable {
    private static EntityManagerFactory sessionFactory;
    public static EntityManagerFactory getSessionFactory()
    {
        if (sessionFactory == null) {
            try {
                sessionFactory = Persistence.createEntityManagerFactory("default");
            } catch (Exception e) {
                System.out.println("Some problems: " + e);
            }
        }
        return sessionFactory;
    }
    @Transactional
    public void save(Point point) {
        EntityManager session = getSessionFactory().createEntityManager();
        session.persist(point);
        session.flush();
        session.close();
    }
    @Transactional
    public void removePointByUser(User user) {
        EntityManager session = getSessionFactory().createEntityManager();
        Query query = session.createQuery("delete from Point where user = :user");
        query.setParameter("user", user);
        query.executeUpdate();
        session.close();
    }
}
