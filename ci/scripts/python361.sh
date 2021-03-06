#image/python:3.6.1
echo "\n\n==Start_CI==\n"
git config --global url."https://{{ .CreatorAccessToken }}:x-oauth-basic@github.com/".insteadOf "https://github.com/"

cd /root/
export PYTHONPATH="/root"

git clone {{ .GetURL }} user
git clone {{ .TestURL }} test

history -c


if [ -f "test/{{ .AssignmentName }}/setup.sh" ]; then
    cd test/{{ .AssignmentName }}/
    bash setup.sh
    cd /root/
fi


# Secret is dumpted to a file and must be read by the scoring module

cat <<EOF > /root/test/secret.txt
{{ .RandomSecret }}
EOF

# Standard naming convention - must be ag_run.py in every lab
python test/{{ .AssignmentName }}/ag_run.py 2>&1
echo "\n==DONE_CI==\n"
