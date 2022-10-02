package com.example.application.data;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class AbstractEntity {

    @Id
    @GeneratedValue
    private Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    // TODO: Implement hashCode and equls so, that object identity relies solely on
    // id. I.e. object is invariant, changing value of the other properties do not change its
    // identity
}