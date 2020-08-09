#!/usr/bin/env groovy


// properties([
//     parameters([
//         string(defaultValue: "http://xxx" ,
//         description: 'Application main url', name: 'BASE_URL'),
//     ])
// ])


def podDefinition = """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: oraclelinux
    image: 'oraclelinux:7-slim'
    tty: true
    command:
    - 'cat'
    env:
    - name: "GIT_SSL_NO_VERIFY"
      value: "true"
    resources:
      limits:
        memory: "1000Mi"
        cpu: "1000m"
      requests:
        memory: "500Mi"
        cpu: "500m"
  nodeSelector:
    env: "dev"
  restartPolicy: "Never"
  securityContext: {}
"""


podTemplate(yaml: podDefinition) {
  node(POD_LABEL) {
    timestamps {
      ansiColor('xterm') {
        try {
          stage('GIT checkout') {
            container('oraclelinux') {
              checkout scm
            }
          }

            stage('Install Dependencies') {
              container('oraclelinux') {
                print "### Installing Dependencies ###"

                // check OS version
                sh 'cat /etc/os-release'
                // install node.js
                sh 'yum -y install oracle-nodejs-release-el7 oracle-release-el7'
                // enable oracle instant client - uncomment if required
                // sh 'yum-config-manager --enable ol7_oracle_instantclient'
                // install sql plus - uncomment if required
                // sh 'yum -y install oracle-instantclient19.6-basic oracle-instantclient19.6-devel oracle-instantclient19.6-sqlplus'
                // install python and python and required libraries
                sh 'yum -y install python3 pkgconfig make gcc curl sudo git libaio wget unzip pixman gcc-c++ nodejs binutils libtool autoconf automake'
                // install linux build tools
                sh "yum -y groupinstall 'Development Tools'"

                sh 'node -v'
                sh 'npm -v'
                sh 'sqlplus -v'
                sh 'python3 --version'
                sh 'npm install -g allure-commandline'
    //             sh 'npm install -D wiremock-standalone'
                sh 'npm install'
              }
            }

            // ** Un-comment if you need oracleClient
/*           stage('Install OracleClient') {
            container('oraclelinux') {
              print "### Installing OracleClient ###"

              // download and install python
              sh '''
                cat /etc/os-release
                yum -y install oracle-nodejs-release-el7 oracle-release-el7
                yum-config-manager --enable ol7_oracle_instantclient
                yum -y install oracle-instantclient19.6-basic oracle-instantclient19.6-devel oracle-instantclient19.6-sqlplus
                sqlplus -v

                yum -y install python3 pkgconfig make gcc curl sudo git libaio wget unzip pixman gcc-c++ nodejs binutils libtool autoconf automake
                yum -y groupinstall 'Development Tools'
                python3 --version
              '''


              // download and place oracle client
              sh '''
                # download and place oracle client
                curl https://download.oracle.com/otn_software/linux/instantclient/19600/instantclient-basic-linux.x64-19.6.0.0.0dbru.zip --silent --output instantclient-basic-linux.x64-19.6.0.0.0dbru.zip
                unzip instantclient-basic-linux.x64-19.6.0.0.0dbru.zip
                rm instantclient-basic-linux.x64-19.6.0.0.0dbru.zip
                ls
                mkdir -p /opt/oracle
                mv instantclient_19_6 /opt/oracle
                chmod -R 755 /opt/oracle

                echo $LD_LIBRARY_PATH
                export LD_LIBRARY_PATH=/opt/oracle/instantclient_19_6
                echo $LD_LIBRARY_PATH

                npm i oracledb
              '''
            }
          } */

          stage('API Tests') {
            container('oraclelinux') {
              print "### Triggering API tests ###"
              sh """
                export LD_LIBRARY_PATH=/opt/oracle/instantclient_19_6
                npm run test
              """
            }
          }

        } catch (err) {
            echo "FAILURE - please check the log"
            throw err
        } finally {
          stage('Allure report') {
              steps {
              script {
                      allure([
                              includeProperties: false,
                              jdk: '',
                              properties: [],
                              reportBuildPolicy: 'ALWAYS',
                              results: [[path: 'allure-results']]
                      ])
              }
              }
          }
        }
      }
    }
  }
}
