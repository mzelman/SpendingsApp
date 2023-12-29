# SpendingsApp

App available [here](https://spendingsapp-frontend-production.up.railway.app/ "Hogwarts Student Management System").

SpendingsApp is a web application allowing users to track their finances. User can save data about all the incomes and spendings separated into months. The spendings are also categorized - each user gets a set of default categories after creating an account. These categories can be customized according to preferences. Below, in section "How to use", screenshots of working app with brief explaination are displayed.

## How to use

After clicking the link above, an user gets a view of a login page.

[1]

To create a new account, chose a link in right top corner "New? Join us!" or a link below login panel "Register". The view below is shown.

[2]

Fill in the form and agree to the Terms and Conditions and the Privacy Policy.

[3]

You will be redirected to login page. Now you can log in with a newly created account. A page with your incomes and spendings categories will be displayed.

[4]

You can use arrows next to the date to change month and see your finances in that months. Total income and Total spendings are reffering to currently shown month and the Balance shows your total balance from all the data provided.
Click "Add income", type in an amount and press "+" sign. The income will be added. 

[5]

To close the popup window, click outside of it.
To add custom category, scroll down and click "Add category" button.

[6]

Type in a name and choose an icon using arrows.

[7]

Then confirm with "Save" button. New category will be created, now you can click on it to add some spendings, the same way as in incomes.

[8]

To delete a spendingm click a trashbin icon next to a spending and confirm.

[9]

To change category name or image click a pen icon next to category name.

[10]

You can also delete a category clicking a trashbin icon next to category name in edit category panel. After confirming, the category will be deleted.
All the added spendings and incomes are calculated and Total income, Total spendings and Balance are actualized. If spendings in current month are higher than incomes, Total spendings' font turn red.
Also if Balance is below 0, it turns red.

[11]

To log out click "Logout" link in upper right corner.

[12]



## Built with
- Java version 17
- Apache Maven 4.0.0
- Spring Boot 3.1.0
- Angular 16.0.0
- Typescript 5.0.2

## Running
Before running te app locally, all the urls have to be adjusted to your local server.

Go to **/SpendingsApp/backend** directory and run:

```bash
mvn clean spring-boot:run
```

then go to **/SpendingsApp/frontend** directory and run:

```bash
ng serve
```
