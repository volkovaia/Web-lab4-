package org.lia.lab4back.Services;

import jakarta.ejb.Stateless;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import org.lia.lab4back.Entities.User;

import java.io.Serializable;
import java.util.Optional;

@Stateless
public class UserRepository implements Serializable
{
    private static EntityManagerFactory sessionFactory;
    public static EntityManagerFactory  getSessionFactory()
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
    public Optional<User> findByUsername(String username) {
        EntityManager session = getSessionFactory().createEntityManager();
        Query query = session.createQuery("from User where username = :name");
        query.setParameter("name", username);
        User user;
        try {
            user = (User) query.getSingleResult();
        }
        catch (NoResultException e) {
            user = null;
        }
        session.close();
        return Optional.ofNullable(user);
    }

    @Transactional
    public Optional<User> findByUsernameAndPassword(String username, String password) {
        EntityManager session = getSessionFactory().createEntityManager();
        Query query = session.createQuery("from User where username = :name and password = :password");
        query.setParameter("name", username);
        query.setParameter("password", password);
        User user;
        try {
            user = (User) query.getSingleResult();
        }
        catch (NoResultException e) {
            user = null;
        }
        session.close();
        return Optional.ofNullable(user);
    }
    @Transactional
    public void save (User user) {
        EntityManager session = getSessionFactory().createEntityManager();
        session.persist(user);
        session.flush();
        session.close();
    }
}
