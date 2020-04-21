package com.jsoncampos.seriesapi.services;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jsoncampos.seriesapi.models.Contacts;
import com.jsoncampos.seriesapi.repositories.ContactsRepository;

@Service
public class ContactsServiceImpl implements ContactsService {

	private ContactsRepository repository;
	
	@Autowired
	public ContactsServiceImpl(ContactsRepository repository) {
		this.repository = repository;
	}
	
	@Override
	public Contacts getContactsForRegion(String regionId) {
		return repository.getOneByRegionId(new ObjectId(regionId));
	}
}
