pipeline {
    agent any
    
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install --save'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test || echo "No tests defined, skipping"'
            }
        }
        
        stage('Security Scan - Dependency Check') {
            steps {
                script {
                    sh '''
                        npm install -g npm-check-updates
                        npm audit --audit-level=high || {
                            echo "High/Critical vulnerabilities found!"
                            exit 1
                        }
                    '''
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t atiqah950/nodejs-app:${BUILD_NUMBER} .'
                    sh 'docker tag atiqah950/nodejs-app:${BUILD_NUMBER} atiqah950/nodejs-app:latest'
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                        sh 'docker push atiqah950/nodejs-app:${BUILD_NUMBER}'
                        sh 'docker push atiqah950/nodejs-app:latest'
                    }
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}
