# 1. What are the responsibilities of each layer of the MVC architecture and how are they connected?
* Models: Classes that represent the data of the app. The model classes use validation logic to enforce business rules for that data. Typically, model objects retrieve and store model state in a database. In this tutorial, a Movie model retrieves movie data from a database, provides it to the view or updates it. Updated data is written to a database.
* Views: Views are the components that display the app's user interface (UI). Generally, this UI displays the model data.
* Controllers: Classes that:
    * Handle browser requests.
    * Retrieve model data.
    * Call view templates that return a response.

# 2. What are the naming conventions for models, controllers, controller actions, views folders and views themselves?
Controllers:
* Class Name: UpperCamelCase + "Controller"

# 3. How to pass data from controllers to views (2 options)?
* Via ViewBag variable
* Via Model

# 4. How to map URL’s to controller actions?
The default URL routing logic used by MVC, uses a format like this to determine what code to invoke:

```
/[Controller]/[ActionName]/[Parameters]
```
Every public method in a controller is callable as an HTTP endpoint.

# 5. How to restrict controller actions to be executed only via certain HTTP request types (e.g., only via POST)?
Via method annotations.

# 6. How to make sure a controller action can only be called through a form on our website and not through some external request?
ValidateAntiForgeryToken

# 7. Where do you define data validation and how do you ensure it in views and controllers?
Through annotations and `ModelState.IsValid` boolean, e.g.:
```
[Required(ErrorMessage = "Name is required!")]
[StringLength(100, ErrorMessage = "Maximal length of the name of a song is 100 characters!")]
```