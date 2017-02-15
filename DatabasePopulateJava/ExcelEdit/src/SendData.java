//the following reads the excel file 
import java.io.File;
import java.io.IOException;
import java.util.Locale;

import jxl.CellView;
import jxl.Workbook;
import jxl.WorkbookSettings;
import jxl.format.UnderlineStyle;
import jxl.write.Formula;
import jxl.write.Label;
import jxl.write.Number;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;
import jxl.Cell;
import jxl.CellType;
import jxl.Sheet;
import jxl.read.biff.BiffException;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

import org.json.simple.JSONObject;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;




public class SendData {
    private String inputFile;

    public void setInputFile(String inputFile) {
            this.inputFile = inputFile;
    }

    public void read() throws IOException  {
            File inputWorkbook = new File(inputFile);
            Workbook w;
            try {
                w = Workbook.getWorkbook(inputWorkbook);
                // Get the first sheet
                Sheet sheet = w.getSheet(0);
                int rows = sheet.getRows();
                int cols = sheet.getColumns();
            	String temp = sheet.getCell(3,2).getContents(); 
            	System.out.println("");

            	for (int i = 3; i < rows; i++){
            		if(sheet.getCell(6,i).getContents() != temp){
	                	System.out.println("var newCourse" + i +  " = new Course ({ \n" + "code:\"" + sheet.getCell(3,i).getContents() + "\"" +  ",");
						System.out.println("title"+":"+"\"" + sheet.getCell(6, i).getContents() + "\"" + "\n" + "});");		
						System.out.println("newCourse" + i + ".save(function(err) {" + "\n" + "if(err) throw err;" + "\n" + "console.log(\"success" + i + "\");});");
						
	                	temp = sheet.getCell(6,i).getContents();
	                	System.out.println("");
	                	System.out.println("");
            		}
            		
            	}
            		
	    
            	} catch (BiffException e) {
                    e.printStackTrace();
            	}
    }

    public static void main(String[] args) throws Exception {
            ReadExcel test = new ReadExcel();
            test.setInputFile("./data/Courses Offered_20170206224953808725.xls");
            test.read();
            
            
            //JSONObject course = new JSONObject();

//            code: "CS101",
//            number: "36.101",
//            title: "Introduction to Computer Science",
//            dep: "School of Computing",
//            type: "Basic Required",
//            lecture: 2,
//            lab: 3,
//            credit: 3,
//            year: 2017,
//            semester: "Spring"
//            
//            course.put("code", "CS101");
//            course.put("number", "36.101");
//            course.put("title", "Introduction to Computer Science");
//            course.put("dep", "School of Computing");
//            course.put("type", "Basic Required");
//            course.put("semester", "Spring");
//            course.put("lecture", "2");
//            course.put("lab", "3");
//            course.put("credit", "3");
//            course.put("year", "2017");
            
            
            //course.put("username", "bake");
            //course.put("password", "independent");
            
            //ReadExcel.sendPost(course);
            
    }
	
    private static void sendPost(JSONObject course) throws Exception {
    	

    	

        String url = "http://localhost:3000/courseroute/";
        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        //add request header
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json");

        // Send post request
        con.setDoOutput(true);
        DataOutputStream wr = new DataOutputStream(con.getOutputStream());
        wr.writeBytes(course.toString());
        wr.flush();
        wr.close();

        int responseCode = con.getResponseCode();
        System.out.println("\nSending 'POST' request to URL : " + url);
        System.out.println("Post body : " + course);
        System.out.println("Response Code : " + responseCode);

        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        //print result
        System.out.println(response.toString());
//        
//        HttpClient client = new DefaultHttpClient();
//        HttpPost post = new HttpPost("http://example.com:3000/");
//        JSONObject msg = new JSONObject();  Log.e("data",code);
//        msg.put("data", code);
//        HttpEntity entity = new StringEntity(msg.toString());
//        BufferedReader reader = new BufferedReader(new   
//        InputStreamReader(client.execute(post).getEntity().getContent()));
//        String response = reader.readLine();
//        Log.e("response", response);
//        
//        
//        
//        
//        
//        
//        
//        
//    	
    	
    } 
    
    
    
    
}

