package com.jsoncampos.seriesapi.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.google.gson.Gson;

@Document("locations")
public class Location {
	
	@Id
	private String id;

	@Field("geo")
	private Point geo;	
	
	@Field("region_id")
	private String regionId;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
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
	
	@Override
	public String toString() {
		return new Gson().toJson(this).toString();
	}
}
