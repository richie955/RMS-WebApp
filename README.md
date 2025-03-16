git clone git@github.com:your-username/your-repo.git
cd RMS-WebApp/rms-backend
python -m venv venv
_________________

source venv/bin/activate  # For macOS/Linux
venv\Scripts\activate     # For Windows
______________________

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

cd ../rms-frontend
npm install
npm run dev  # For Next.js

