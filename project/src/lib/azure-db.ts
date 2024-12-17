import sql from 'mssql';
import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';

// Configuración para Azure Key Vault
const keyVaultName = process.env.VITE_AZURE_KEY_VAULT_NAME;
const keyVaultUrl = `https://${keyVaultName}.vault.azure.net`;

// Configuración para la base de datos
let poolConnection: sql.ConnectionPool | null = null;

async function getDbConfig() {
  try {
    // Usar DefaultAzureCredential para autenticación
    const credential = new DefaultAzureCredential();
    const secretClient = new SecretClient(keyVaultUrl, credential);

    // Obtener las credenciales de Key Vault
    const dbServer = await secretClient.getSecret('DB-SERVER');
    const dbName = await secretClient.getSecret('DB-NAME');
    const dbUser = await secretClient.getSecret('DB-USER');
    const dbPassword = await secretClient.getSecret('DB-PASSWORD');

    return {
      server: dbServer.value,
      database: dbName.value,
      user: dbUser.value,
      password: dbPassword.value,
      options: {
        encrypt: true,
        trustServerCertificate: false,
        enableArithAbort: true
      }
    };
  } catch (error) {
    console.error('Error al obtener configuración de Azure Key Vault:', error);
    throw error;
  }
}

export async function getDbConnection() {
  try {
    if (poolConnection && !poolConnection.closed) {
      return poolConnection;
    }

    const config = await getDbConfig();
    poolConnection = await sql.connect(config);
    
    return poolConnection;
  } catch (error) {
    console.error('Error al conectar con Azure SQL Database:', error);
    throw error;
  }
}

export async function closeDbConnection() {
  try {
    if (poolConnection) {
      await poolConnection.close();
      poolConnection = null;
    }
  } catch (error) {
    console.error('Error al cerrar la conexión:', error);
    throw error;
  }
}

// Ejemplo de función para ejecutar queries
export async function executeQuery<T>(query: string, params: any[] = []): Promise<T[]> {
  const pool = await getDbConnection();
  try {
    const request = pool.request();
    
    // Agregar parámetros si existen
    params.forEach((param, index) => {
      request.input(`param${index}`, param);
    });

    const result = await request.query(query);
    return result.recordset;
  } catch (error) {
    console.error('Error al ejecutar query:', error);
    throw error;
  }
}