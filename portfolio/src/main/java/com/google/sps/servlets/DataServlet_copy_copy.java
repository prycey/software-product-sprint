// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentiment;
import java.io.*; 
import java.lang.*; 
import java.io.IOException;
import com.google.gson.Gson;
import java.util.ArrayList;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/sentiment")
public class DataServlet_copy_copy extends HttpServlet {
     
ArrayList<String> arrli = new ArrayList<String>();
public void doPost(HttpServletRequest request, HttpServletResponse response)throws IOException{
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    String comment = request.getParameter("comments");

    System.out.print(comment);

  Document doc =
    Document.newBuilder().setContent(comment).setType(Document.Type.PLAIN_TEXT).build();
LanguageServiceClient languageService = LanguageServiceClient.create();
Sentiment sentiment = languageService.analyzeSentiment(doc).getDocumentSentiment();
float score = sentiment.getScore();
languageService.close();
  response.setContentType("text/html;");
    response.getWriter().println("<h1>Sentiment Analysis</h1>");
    response.getWriter().println("<p>You entered: " + comment + "</p>");
    response.getWriter().println("<p>Sentiment analysis score: " + score + "</p>");
      response.sendRedirect("/index.html");
}
  
}