package com.jsoncampos.seriesapi.services;

import com.jsoncampos.seriesapi.models.Contacts;

public interface ContactsService {
	public Contacts getContactsForRegion(String regionId);
}
