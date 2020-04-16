package com.jsoncampos.seriesapi.models;

import java.util.Date;
import java.util.List;


public  class HeadlinesResponse {
	 private String status;
	 private String message;
	 private int totalResults;
	 private List<Article> articles;
	 private Source source;

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	public String getMessage() {
		return this.message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}

	public int getTotalResults() {
		return totalResults;
	}

	public void setTotalResults(int totalResults) {
		this.totalResults = totalResults;
	}

	public List<Article> getArticles() {
		return articles;
	}

	public void setArticles(List<Article> articles) {
		this.articles = articles;
	}

	public Source getSource() {
		return source;
	}

	public void setSource(Source source) {
		this.source = source;
	}

	public static class Article {
		Source source;
		String title;
		String url;
		Date publishedAt;
		public Source getSource() {
			return source;
		}
		public void setSource(Source source) {
			this.source = source;
		}
		public String getTitle() {
			return title;
		}
		public void setTitle(String title) {
			this.title = title;
		}
		public String getUrl() {
			return url;
		}
		public void setUrl(String url) {
			this.url = url;
		}
		public Date getPublishedAt() {
			return publishedAt;
		}
		public void setPublishedAt(Date publishedAt) {
			this.publishedAt = publishedAt;
		}
	}
	
	public static class Source {
		String id, name;
	
		public String getId() {
			return id;
		}
	
		public void setId(String id) {
			this.id = id;
		}
	
		public String getName() {
			return name;
		}
	
		public void setName(String name) {
			this.name = name;
		}
	}
}