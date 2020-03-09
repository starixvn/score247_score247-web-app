@Library("JenkinsPipelineLibrary") _

pipeline{
    agent {
        label 'slaveSUN'
    }

    options{
        buildDiscarder(logRotator(numToKeepStr: '5'))
        disableConcurrentBuilds()
    }

    triggers{
        pollSCM("H/30 * * * *")
    }

    stages{

        stage("Typescript Unittest & Coverage"){
            steps{
                script{
                    pipelineLib.tsJest("")
                }
            }
        }

        stage("Deploy to - https://score247-web-autotest.nexdev.net/"){
            when {
                allOf {
                    expression { BRANCH_NAME ==~ /^(origin\/)*\d+\-Sprint\d+$/ }
                }
            }

            steps{
                script{
                     pipelineLib.deployByRocketor("11770", "$BRANCH_NAME", "", "", "1c36df7007d446feb2324f405afa4cab")
                }
            }
        }

        stage("Run Site Audit - https://score247-web-autotest.nexdev.net/"){
            steps{
                 bat label: "Install Package", script: "npm install"

                 bat label: "Run Audit Desktop", script: "npm run lighthouse:run:desktop"
                 publishHTML (target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: '.',
                        reportFiles: 'html_desktop_audit.report.html',
                        reportName: "LighthouseDesktop"
                    ])
                 echo "${BUILD_URL}LighthouseDesktop/"

                 bat label: "Run Audit Mobile", script: "npm run lighthouse:run:mobile"
                 publishHTML (target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: '.',
                        reportFiles: 'html_mobile_audit.report.html',
                        reportName: "LighthouseMobile"
                    ])
                 echo "${BUILD_URL}LighthouseMobile/"

                 bat label: "Check Audit Report", script: "npm run lighthouse:report"
            }
        }
    }
    post{
        unsuccessful{
            emailext body: '$DEFAULT_CONTENT', subject: '$DEFAULT_SUBJECT', to: 'ricky.nguyen@starixsoft.com,conall.nguyen@starixsoft.com,elton.ton@starixsoft.com,alvin.nguyen@starixsoft.com,tyler.dang@starixsoft.com,theresa.le@starixsoft.com,anders.le@starixsoft.com'
        }
    }
}
