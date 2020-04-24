package com.jsoncampos.seriesapi.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({ "www", "facebook", "twitter" })
public class ContactsDto {
	private String www;
	private String twitter;
	private String facebook;
	
	public String getWww() {
		return www;
	}
	public void setWww(String www) {
		this.www = www;
	}
	public String getTwitter() {
		return twitter;
	}
	public void setTwitter(String twitter) {
		this.twitter = twitter;
	}
	public String getFacebook() {
		return facebook;
	}
	public void setFacebook(String facebook) {
		this.facebook = facebook;
	}
}
