# FEAST Landing Page Source Code

### What features does this source code include?
- Production ready, you can immediately deploy this to Digital Ocean.
- Comes with a landing, about us, blog, and contact page that you can modify.
- Responsive design.
- Contact us form.
- 404 page
- Has blog with Trix WYSIWYG editor built into the admin panel.
- Technical SEO optimization.
- Dynamic Sitemap.xml
- Robots.txt
- Google analytics
- Custom user model.
- Google SMTP email server connections
- Tailwind css setup for rapid development (note: the tailwind classes are prefixed with `tw-`, to differentiate them)

### Table of contents

  - [What features does Django template include?](#what-features-does-django-template-include)
  
- [Local development](#local-development)
  - [Admin superuser](#admin-superuser)
- [Deployment:](#deployment)


## Local development

Follow the below steps for local development setup:

1. Ensure a new repo has been created using this template ('https://github.com/wesordonez/web-dev-template')

2. Create a virtual environment for local development

```py
python3 venv -venv
python3 source bin activate
```

3. Install dependencies

```py
pip install -r requirements.txt
```

4. Add a `.env` file inside the `project` folder using the included `.env.dev` file as a guide.

Required env variables are:
- SECRET_KEY
- Development Database Variables (default configuration is for postgres but sqlite would work too)

> **NOTE:** The secret key is generated using the `get_random_secret_key()` function. Copy this into the `.env` file and delete the print statement AFTER the databases and tables have been migrated

5. Create a new database in postgres (PGAdmin 4) with the name used in the env variabl `SQL_NAME`

6. Now in your terminal create database tables using

```
python manage.py migrate
```
Your database should be created and ready to use.

> **IMPORTANT:** This step should not be skipped as it may cause problems in the migration history order requiring a restart.

7. The migrate command should have triggered the `get_random_secret_key()` function outputing a secret key. This should be copied into the `env` file at this time and the printstatement commented out. A new secret key should be created for the production secret when time for deployment. 

8. Now run the website from the terminal using.

```py
python manage.py runserver
```
Your website should be available at: http://localhost:8000/

Test the website works and the contact form successfully writes data to the created database.

9. To run Tailwind CSS open a new terminal and run:
```py
npm install tailwindcss@3.4
npm install cross-env
npm install postcss-simple-vars
```
Then you should be able to start tailwind which will auto update and watch for changes using this command:
```py
python manage.py tailwind start
```
> **IMPORTANT:** Tailwind has been updated to 4.0 which has a different install process. Template is not yet configured for it so use older 3.4 version! 

10. Create admin superuser using the following command in terminal:
```py
python manage.py createsuperuser
```

Follow the prompts and test at: https:localhost:8000/admin/

## Troubleshooting
**Note:** If you are facing problems starting this program in windows OS, remove logging from project/settings.py

## Deployment:

Follow Dunosis documentation to deploy to Digital Ocean App Platform using GitHub Actions. 

## Credits
This template was based heavily on the following template by PaulleDemon
- https://github.com/PaulleDemon/Django-website-template
