package com.seeshore.toget.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateTimeFunctions {
    public Date convertISODateStringToDate(String date) {
        try {
            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
            return dateFormat.parse(date);
        } catch (Exception e) {
            throw new RuntimeException("The provided date could not be parsed");
        }

    }
}
