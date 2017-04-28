<a name="inicio"></a>
Decidir SDK Javascript
===============

Modulo para conexión con gateway de pago DECIDIR2

+ [Introducción](#introduccion)
  + [Alcance](#scope)
  + [Diagrama de secuencia](#secuencia)
+ [Instalación](#instalacion)
 + [Versiones de Andrioid soportadas](#versionesdeandroidoportadas)
  + [Manual de Integración](#manualintegracion)
  + [Ambientes](#environments)
+ [Uso](#uso)
  + [Inicializar la clase correspondiente al conector](#initconector)
  + [Operatoria del Gateway](#operatoria)
    + [Generaci&oacute;n de Token de Pago](#authenticate)
     +  [Con datos de tarjeta](#datostarjeta)
     +  [Con tarjeta tokenizada](#tokentarjeta)


<a name="introduccion"></a>
## Introducción
El flujo de una transacción a través de las **sdks** consta de dos pasos, la **generaci&oacute;n de un token de pago** por parte del cliente y el **procesamiento de pago** por parte del comercio. Existen sdks espec&iacute;ficas para realizar estas funciones en distintos lenguajes que se detallan a continuaci&oacute;n:

+ **Generaci&oacute;n de un token de pago.**  Se utiliza alguna de las siguentes **sdks front-end** :
 + [sdk IOS](https://github.com/decidir/SDK-IOS.v2)
 + [sdk Android](https://github.com/decidir/SDK-Android.v2)
 + [sdk Javascript](https://github.com/decidir/sdk-javascript-v2)
+ **Procesamiento de pago.**  Se utiliza alguna de las siguentes **sdks back-end** :
 + [sdk Java](https://github.com/decidir/SDK-JAVA.v2)
 + [sdk PHP](https://github.com/decidir/SDK-PHP.v2)
 + [sdk .Net](https://github.com/decidir/SDK-.NET.v2)
 + [sdk Node](https://github.com/decidir/SDK-.NODE.v2)

[<sub>Volver a inicio</sub>](#inicio)

<a name="scope"></a>
## Alcance
La **sdk Android** provee soporte para su **aplicaci&oacute;n front-end**, encargandose de la **generaci&oacute;n de un token de pago** por parte de un cliente. Este **token** debe ser enviado al comercio al realizar el pago.
Esta sdk permite la comunicaci&oacute;n del cliente con la **API Decidir** utilizando su **API Key p&uacute;blica**<sup>1</sup>.

Para procesar el pago con **Decidir**, el comercio podr&acute; realizarlo a trav&eacute;s de alguna de las siguentes **sdks front-backend**:
+ [sdk Java](https://github.com/decidir/SDK-JAVA.v2)
+ [sdk PHP](https://github.com/decidir/SDK-PHP.v2)
+ [sdk .Net](https://github.com/decidir/SDK-.NET.v2)
+ [sdk Node](https://github.com/decidir/SDK-.NODE.v2)

![imagen de sdks](./docs/img/DiagramaSDKs.png)</br>

---
<sup>_1 - Las API Keys serán provistas por el equipo de Soporte de DECIDIR (soporte@decidir.com.ar). _</sup>

[<sub>Volver a inicio</sub>](#inicio)

<a name="secuencia"></a>

## Diagrama de secuencia
El flujo de una transacción a través de las **sdks** consta de dos pasos, a saber:

1. **sdk front-end:** Se realiza una solicitud de token de pago con la Llave de Acceso pública (public API Key), enviando los datos sensibles de la tarjeta (PAN, mes y año de expiración, código de seguridad, titular, y tipo y número de documento) y obteniéndose como resultado un token que permitirá realizar la transacción posterior.

2. **sdk back-end:** Se ejecuta el pago con la Llave de Acceso privada (private API Key), enviando el token generado en el Paso 1 más el identificador de la transacción a nivel comercio, el monto total, la moneda y la cantidad de cuotas.

A continuación, se presenta un diagrama con el Flujo de un Pago.

![imagen de configuracion](./docs/img/FlujoPago.png)</br>

[<sub>Volver a inicio</sub>](#inicio)

<a name="instalacion"></a>
## Instalación
Se debe descargar la última versión del SDK desde el botón Download ZIP del branch master.
Una vez descargado y descomprimido, se debe agregar la librería `decidir-sdk-android-release.aar` que se encuentra dentro de la carpeta`./decidir-sdk-android/build/outputs/aar`, a las librerías del proyecto y en el codigo se debe agregar siguiente import.

```java
import com.android.decidir.sdk.Authenticate;
import com.android.decidir.sdk.dto.*;
import com.android.decidir.sdk.exceptions.*;
```

<a name="versionesdeandroidsoportadas"></a>
### Versiones de Android soportadas
La versi&oacute;n implementada de la SDK, est&aacute; testeada para versiones desde API Level 14 (Android version >= 4.0)

[<sub>Volver a inicio</sub>](#inicio)

<a name="manualintegracion"></a>

## Manual de Integración

Se encuentra disponible en Gitbook el **[Manual de Integración Decidir2] (https://decidir.api-docs.io/1.0/guia-de-inicio/)** para su consulta online, en este detalla el proceso de integración. En el mismo se explican los servicios y operaciones disponibles, con ejemplos de requerimientos y respuestas, aquí sólo se ejemplificará la forma de llamar a los distintos servicios usando la presente SDK.

[<sub>Volver a inicio</sub>](#inicio)

<a name="test"></a>

## Ambientes

El SDK-Android permite trabajar con todos los ambientes de Decidir.
El ambiente se debe instanciar indicando su URL.

```java
import com.android.decidir.sdk.Authenticate;

public class MiClase {
String publicApiKey = "92b71cf711ca41f78362a7134f87ff65";
String urlDesarrollo = "https://developers.decidir.com/api/v1";
String urlProduccion = "https://live.decidir.com/api/v1";
int timeout = 2; //Expresado en segundos
//Para el ambiente de desarrollo
Authenticate decidirDesa = new Authenticate(publicApiKey, urlDesarrollo, timeout);
//Para el ambiente de produccion
Authenticate decidirProd = new Authenticate(publicApiKey, urlProduccion, timeout);
// ...codigo...
}
```
[<sub>Volver a inicio</sub>](#inicio)

<a name="uso"></a>
## Uso

<a name="initconector"></a>
### Inicializar la clase correspondiente al conector.

Instanciación de la clase `Authenticate`

La misma recibe como parámetros la public key provista por Decidir para el comercio y el ambiente en que se trabajar$aacute;.

La API Key será provista por el equipo de Soporte de DECIDIR (soporte@decidir.com.ar).

```java
// ...codigo...
String publicApiKey = "92b71cf711ca41f78362a7134f87ff65";
//Para el ambiente de produccion(default) usando public api key
Authenticate decidir = new Authenticate(publicApiKey);
//...codigo...
```

[<sub>Volver a inicio</sub>](#inicio)

<a name="operatoria"></a>

## Operatoria del Gateway

<a name="authenticate"></a>

### Generaci&oacute;n de Token de Pago

El SDK-Android permite generar, desde el dispositivo mobile, un token de pago con los datos de la tarjeta del cliente. &Eacute;ste se deber&aacute; enviar luego al backend del comercio para realizar la transacci&oacute;n de pago correpondiente.

El token de pago puede ser generado de 2 formas como se muestra a continuaci&oacute;n.

[<sub>Volver a inicio</sub>](#inicio)

<a name="datostarjeta"></a>

#### Con datos de tarjeta

Mediante este recurso, se genera una token de pago a partir de los datos de la tarjeta del cliente.

```java
// ...codigo...
String publicApiKey = "92b71cf711ca41f78362a7134f87ff65";
//Para el ambiente de produccion(default) usando public api key
Authenticate decidir = new Authenticate(publicApiKey);
//Datos de tarjeta
AuthenticationWithoutToken datos = new AuthenticationWithoutToken();
datos.setCard_number("4509790112684851"); //Nro de ""tarjeta. MANDATORIO
datos.setSecurity_code("123"); // CVV. OPCIONAL
datos.setCard_expiration_month("03"); //Mes de vencimiento [01-12]. MANDATORIO
datos.setCard_expiration_year("19");//Año de vencimiento[00-99]. MANDATORIO
datos.setCard_holder_name("TITULAR"); //Nombre del titular tal como aparece en la tarjeta. MANDATORIO
CardHolderIdentification idTitular = new CardHolderIdentification(); //Identificacion del titular de la tarjeta. Es opcional, pero debe estar completo si se agrega
idTitular.setType("dni");//MANDATORIO
idTitular.setNumber("12345678");//MANDATORIO
datos.setCard_holder_identification(idTitular); //OPCIONAL

//Datos para consumo de servicio
Context context = ... //Application context ( android.content.Context)
Boolean deteccionFraude = Boolean.TRUE; // Si se realiza deteccion de fraude por CyberSource
int timeoutFraude = 10; //Timeout para la solicitud de deteccion de fraude. Expresado en segundos. Por default es 30 segundos.
try {
DecidirResponse<AuthenticationResponse> respuesta = decidir.createPaymentToken(datos, context, deteccionFraude, timeoutFraude)
// Procesamiento de respuesta de la generacion de token de pago
// ...codigo...
} catch (DecidirException de) {
// Manejo de excepcion  de Decidir
 // ...codigo...
} catch (Exception e) {
 //Manejo de excepcion general
// ...codigo...
}
//...codigo...
```

[<sub>Volver a inicio</sub>](#inicio)

<a name="tokentarjeta"></a>

#### Con tarjeta tokenizada

Mediante este recurso, se genera una token de pago a partir una tarjeta tokenizada previamente.

```java
// ...codigo...
String publicApiKey = "92b71cf711ca41f78362a7134f87ff65";
//Para el ambiente de produccion(default) usando public api key
Authenticate decidir = new Authenticate(publicApiKey);
//Datos de tarjeta tokenizada
AuthenticationWithToken datos = new AuthenticationWithToken();
datos.setToken("f522e031-90cb-41ed-ba1f-46e813e8e789"); //Tarjeta tokenizada MANDATORIO
datos.setSecurity_code("123"); // CVV. OPCIONAL

//Datos para consumo de servicio
Context context = ... //Application context ( android.content.Context)
Boolean deteccionFraude = Boolean.TRUE; // Si se realiza deteccion de fraude por CyberSource
int timeoutFraude = 10; //Timeout para la solicitud de deteccion de fraude. Expresado en segundos. Por default es 30 segundos.
try {
DecidirResponse<AuthenticationResponse> respuesta = decidir.createPaymentTokenWithCardToken(datos, context, deteccionFraude, timeoutFraude)
// Procesamiento de respuesta de la generacion de token de pago
// ...codigo...
} catch (DecidirException de) {
// Manejo de excepcion  de Decidir
 // ...codigo...
} catch (Exception e) {
 //Manejo de excepcion general
// ...codigo...
}
//...codigo...
```
[<sub>Volver a inicio</sub>](#inicio)


<a name="cybersource"></a>

## Integración con Cybersource

Para utilizar el Servicio de Control de Fraude Cybersource, debe indicarse en un par&aacute;metro al momento de invocar el servicio de generaci&oacute;n de token de pago.
[Ver ejemplo](#tokentarjeta)

[<sub>Volver a inicio</sub>](#inicio)
