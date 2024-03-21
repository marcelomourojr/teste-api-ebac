pipeline {
    agent any

    stages {
        stage('Clonar o repositorio'){
            steps {
                git branch: 'main', url: 'http://github.com/EBAC-QE/testes-e2e-ebac-shop.git'
            }
        }
        stage('Instalar dependencias') {
            steps {
                sh 'npm install'
            }
        }
        stage('Executar Testes') {
            steps {
                sh 'NO_COLOR=1 npm run cy:run'
            }
        }
    }
}