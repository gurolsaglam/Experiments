# Function to read the contacts from a given contact file and return a
# list of names and email addresses
def get_contacts(filename):
    names = []
    emails = []
    usernames = []
    userpws = []
    vncpws = []
    portids = []
    with open(filename, mode='r', encoding='utf-8') as contacts_file:
        for a_contact in contacts_file:
            names.append(a_contact.split()[0])
            emails.append(a_contact.split()[1])
            usernames.append(a_contact.split()[2])
            userpws.append(a_contact.split()[3])
            vncpws.append((a_contact.split()[3])[0:8])
            portids.append(a_contact.split()[4])
    return names, emails, usernames, userpws, vncpws, portids

from string import Template

def read_template(filename):
    with open(filename, 'r', encoding='utf-8') as template_file:
        template_file_content = template_file.read()
    return Template(template_file_content)

# import the smtplib module. It should be included in Python by default
import smtplib
# set up the SMTP server
s = smtplib.SMTP(host='smtp-mail.outlook.com', port=587)
s.starttls()
s.login("mail@hotmail.com", "YOURPASSWORD_OR_YOURAPPPASSWORDFOREMAIL")

names, emails, usernames, userpws, vncpws, portids = get_contacts('contacts.txt')  # read contacts
message_template = read_template('message.txt')

# import necessary packages
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# For each contact, send the email:
for name, email, username, userpw, vncpw, portid in zip(names, emails, usernames, userpws, vncpws, portids):
    msg = MIMEMultipart()       # create a message

    # add in the actual person name to the message template
    message = message_template.substitute(PERSON_NAME=name.title(), USER_NAME=username, USER_PW=userpw, VNC_PW=vncpw, USER_ID=portid)

    # setup the parameters of the message
    msg['From']="mail@hotmail.com"
    msg['To']=email
    msg['Subject']="Server user credentials"

    # add in the message body
    msg.attach(MIMEText(message, 'plain'))

    # send the message via the server set up earlier.
    s.send_message(msg)
    
    del msg