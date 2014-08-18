from django.db import models

class Clientes(models.Model):
	nombre  = models.CharField(max_length= 45)
	paterno = models.CharField(max_length=45)
	materno = models.CharField(max_length=45)

	def __unicode__(self):
		return str(self.nombre)

class Pedidos(models.Model):
	numero    = models.IntegerField(default=0)
	fecha	  = models.DateField(('Fecha'),auto_now_add=False)
	total	  = models.CharField(max_length=45)
	cliente   = models.ForeignKey(Clientes)

	def __unicode__(self):
		return str(self.cliente)

class Productos(models.Model):
	nombre      = models.CharField(max_length=45)
	descripcion = models.CharField(max_length=45)

	def __unicode__(self):
		return str(self.nombre)

class LineaPedido(models.Model):
	producto  = models.ForeignKey(Productos)
	pedido    = models.ForeignKey(Pedidos)
	precio 	  = models.FloatField()
	cantidad  = models.IntegerField()

	def __unicode__(self):
		return str(self.cantidad)

	
