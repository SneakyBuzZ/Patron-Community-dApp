pipeline{
    agent any
    parameters{
        choice(
            choices: ['http://localhost:3000'],
            description: 'Select the REACT_APP_BASE_URL option',
            name: 'VITE_SERVER_URL'
        )
    }
    stages{
        stage('Checkout') {
            steps {
                git branch: 'dev', url: 'https://github.com/SneakyBuzZ/Patron-Community-dApp.git'
            }
        }
        stage('Build') {
            agent {
                docker {
                    image "node:18"
                }
            }
            steps {
                sh 'npm install'
                sh 'npm run lint'
                sh 'npm run build'
                stash includes: 'dist/**', name: 'build'
            }
        }
        stage('S3 Deploy') {
            steps {
                script {
                    unstash 'build'
                    def awsS3Bucket = 'patron-community-dapp'
                    sh "aws s3 sync dist/ s3://${awsS3Bucket}/"
                }
            }
        }
    }
}
