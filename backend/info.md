-- AUTH --
POST  /api/auth/register               - register user
POST  /api/auth/login                  - { access_token, token_type }
GET   /api/auth/me                     - current user (id, email, role)

-- PROJECTS --
GET   /api/projects                    - list projects
POST  /api/projects                    - create project

-- DEFECTS --
GET   /api/defects                     - list (filter/sort/paging)
POST  /api/defects                     - create (multipart/form-data)
GET   /api/defects/{id}                - get
PUT   /api/defects/{id}                - update
POST  /api/defects/{id}/status         - change status (history recorded)
POST  /api/defects/{id}/comment        - add comment

-- FILES/REPORTS/EXPORTS --
POST  /api/attachments/upload          - upload file (returns id, url)
GET   /api/reports/export?fmt=csv|xlsx - exports
GET   /api/reports/analytics           - aggregated stats (for charts)
