1. Create a user by calling /signup post endpoint:

    curl --location --request POST 'http://localhost:3000/signup' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "name": "me3",
        "pass": "pass3"
    }'

    the response is the user's credentials

2. Login with the newly created user by calling /login post endpoint:

    curl --location --request POST 'http://localhost:3000/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "name": "me3",
        "pass" : "pass3"
    }'

    the response is the jwt token

3. Fill the pdf form by calling the /fillform post endpoint :
    (paste the jwt token from the previous request to the "Authorization" header: Bearer + token)

    curl --location --request POST 'http://localhost:3000/fillform' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJtZTIiLCJwYXNzIjoiIn0sImlhdCI6MTcwMzk0OTg5OSwiZXhwIjoxNzA0MDM2Mjk5fQ.iIcyu5j_qXfaDuggUiYahS-H0yzhS9kBfo0Kjvz0_mQ' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "name": "me3",
        "address" : "address",
        "day": 2,
        "month": 11,
        "year": 2001,
        "activities" : [{"name": "Walking"}, {"name": "Music"}],
        "favouriteActivity" : { "name": "Other", "additionalFiled": "nothing"}
    }'

    the response is the pdf file url.

4. I had some problems with the PDF file - all the radiobuttons in the "favourite activity" have the same name 
    and the "pdf-lib" uses this name as identifier. 
    To check this you can uncomment the lines 62,63 in the "PDFService.ts".
    Please be aware that the data you send to this PDF part can be displayed incorrectly.

