Feature: To book tickets
    Scenario: Successful selection of the film and the transition to the booking page
        Given user is on "https://qamid.tmweb.ru/client/index.php" page
        When user chooses 3 day 
        And user chooses first film 
        Then user sees a page for booking tickets for the movie: "Зверополис".

    Scenario: Successful movie booking
        Given user is on "https://qamid.tmweb.ru/client/index.php" page
        When user chooses 3 day 
        And user chooses first film 
        And user chooses the 7 place on the 3 row
        And user presses the button
        Then user goes to the booking page of the selected place and sees a button with the text: "Получить код бронирования".

        
    Scenario: Should not choose seat
        Given user is on "https://qamid.tmweb.ru/client/index.php" page
        When user chooses 3 day 
        And user chooses first film 
        And user chooses the 7 place on the 3 row 
        And user again chooses the 7 place on the 3 row
        Then user sees button "Забронировать" become disable