package com.jsoncampos.covid19.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("locations")
public class Location {
	
	@Id
	private String id;

	@Field("geo")
	private Point geo;	
	@Field("region_id")
	private String regionId;
	@Field("municipality_id")
	private String municipalityId;
	
	public Point getGeo() {
		return geo;
	}
	public void setGeo(Point geo) {
		this.geo = geo;
	}
	public String getRegionId() {
		return regionId;
	}
	public void setRegionId(String regionId) {
		this.regionId = regionId;
	}
	public String getMunicipalityId() {
		return municipalityId;
	}
	public void setMunicipalityId(String municipalityId) {
		this.municipalityId = municipalityId;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
}
