Project Accel Backend Requirements


Objective: 

ProjectAccel is a project management tool like Jira, Asana following Agile methodology. It’s a SAAS so we have multiple workspaces.

Prerequisites.  -> 

Signup -> User signs up and creates a workspace. (creator of the workspace is the admin. The ownership of the workspace can be transferred later.) 
So we need a workspace ID (WS0001) to properly map users to their workspaces
When users are created by admin and invite is sent the users will be mapped to that workspace.




Module-1 - User Management

1.1.1 Create User: (Required Role Admin)

Required Fields

Name
Email
Password 
Confirm password 
Role (Admin, Manager, Member, Guest) dropdown
Designation - (text)
Years of experience

1.1.2  Create Role (Required Role Admin)

Required Fields:
Role Name
Role Description
Inherit From (dropdown)
Default Access Scope(Entire Workspace etc)

Then as checkbox can check 1 or 4 boxes also (view, edit, create, delete) the below modules
core:
Projects
Tasks
Sprints
Team
Files and Documents
Reports 
Workspace
Team and User management:
Members
Roles and Permissions
Communication and Collaboration:
Comments
Notifications
Community Chat
Direct Messages
Administrator/ Advanced 

Billing and Subscriptions
Integrations
System settings

Note:  The Role Permissions are completely customizable for the above and admin can setup what the user role like manager or member can have depending on their organization meaning different workspace’s managers will have different permissions

Above all this is a superadmin whose role is to manage multiple workspaces




















 


