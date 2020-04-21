package com.jsoncampos.seriesapi.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.jsoncampos.seriesapi.models.Contacts;

@Repository
public interface ContactsRepository extends MongoRepository<Contacts,String> {
	public Contacts getOneByRegionId(ObjectId regionId);
}
