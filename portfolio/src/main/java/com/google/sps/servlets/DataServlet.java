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
@WebServlet("/data2")
public class DataServlet extends HttpServlet {
    
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
//ArrayList<String> arrli = new ArrayList<String>();
//Gson gson = new Gson();
//String json =  gson.toJson(arrli);
 DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
Query query = new Query("comment");
PreparedQuery results = datastore.prepare(query);
for (Entity entity : results.asIterable()) {
    response.setContentType("text/html;");
    //response.getWriter().println( (String)entity.getProperty("name"));
    //response.getWriter().println("<p>Color: " + color + "</p>");
    response.getWriter().println( (String) entity.getProperty("comment") );
    response.getWriter().println(" ");
  }
  System.out.println(response);
  //response.sendRedirect("/index.html");
}

}