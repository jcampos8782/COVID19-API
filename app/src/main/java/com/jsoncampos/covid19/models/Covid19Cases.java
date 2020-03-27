package com.jsoncampos.covid19.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.google.gson.Gson;

@Document("cases")
public class Covid19Cases {
	
	@Id
	private String id;
	
	private CaseSummary cases;
	private Location location;

	public CaseSummary getCases() {
		return cases;
	}

	public void setCases(CaseSummary cases) {
		this.cases = cases;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}
	
	@Override
	public String toString() {
		return new Gson().toJson(this).toString();
	}
}
