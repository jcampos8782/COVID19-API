package com.jsoncampos.covid19.models;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.mapping.Document;

import com.google.gson.Gson;

@Document("cases")
public class Covid19Cases {
	
	@Id
	private String id;
	
	private Date date;
	private CaseSummary cases;
	private Point geo;
	private Location location;

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

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

	public Point getGeo() {
		return geo;
	}

	public void setGeo(Point geo) {
		this.geo = geo;
	}
	
	@Override
	public String toString() {
		return new Gson().toJson(this).toString();
	}
}
