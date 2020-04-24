package com.jsoncampos.seriesapi.controllers.responses;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.jsoncampos.seriesapi.dto.ContactsDto;

public class GetRegionContactsResponse extends ResponseEntity<ContactsDto>{
	public GetRegionContactsResponse(ContactsDto dto) {
		super(dto, HttpStatus.OK);
	}
}
