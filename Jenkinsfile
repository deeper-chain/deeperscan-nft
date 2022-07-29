#!groovy

def slackChannel = '#devops-test'
def execNode = 'master-runner'
def registry = '561108432312.dkr.ecr.ap-southeast-1.amazonaws.com/deeperscan-nft'
def dockerTag = env.BRANCH_NAME
def deployCmd = 'kubectl rollout restart deployment/deeperscan-nft-dev -n dev'
def upstreamProjects = ''


if (env.BRANCH_NAME == "master") {
    deployCmd = "kubectl rollout restart deployment/deeperscan-nft -n deeperscan"
}


pipeline {
    agent {
        node { label execNode }
    }

    options {
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '5', artifactNumToKeepStr: '3'))
    }

    triggers {
        upstream(
            upstreamProjects: upstreamProjects,
            threshold: hudson.model.Result.SUCCESS
        )
    }
    environment {
        webhook_key = credentials('webhook_key')
        TARGET_DOCKER_IMAGE = "${registry}:${dockerTag}"
        DEPLOY_CMD = "${deployCmd}"

    }

    stages {
        stage('test') {
            when {
                not {
                    anyOf {
                        branch 'master'
                    }
                }
            }
            stages {
                stage('Unit Test') {
                    steps {
                        echo 'prepare to code test'
                    //TODO
                    }
                }
                stage('report') {
                    when {
                        not {
                            branch 'PR-*'
                        }
                    }
                    steps {
                        echo 'generate code report'
                    //TODO
                    }
                }
            }
        }

        stage('Build') {
            when {
                anyOf {
                   branch "master"
                   branch "dev"
                }
            }
            steps {
                sh  '''
                    docker build -t $TARGET_DOCKER_IMAGE .
                    '''
            }
        }
        stage('push image') {
            when {
                anyOf {
                    branch 'master'
                    branch 'dev'
                }
            }
            steps {
                sh 'docker push $TARGET_DOCKER_IMAGE'
            }
        }

        stage('Deploy code') {
            when {
                anyOf {
                   branch "master"
                   branch "dev"
                }
            }
            steps {
                  sh '$DEPLOY_CMD'
            }
        }
    }
    post {

        always {
           cleanWs()
        }
        success {
            slackSend channel: slackChannel, color: 'good',
                message: "${env.JOB_NAME} CICD SUCCESS,<${env.BUILD_URL}console|cliek me get details>"
        }
        failure {
            slackSend channel: slackChannel, color: 'danger',
                message: "${env.JOB_NAME} CICD FAILED!!! <${env.BUILD_URL}console|cliek me check log>"
        }
    }

}
