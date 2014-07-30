from django.contrib import admin
from models import *

class ClientesAdmin(admin.ModelAdmin):
	list_display =('nombre','paterno','materno',)

class ProductosAdmin(admin.ModelAdmin):
	list_display =('nombre','descripcion',)

class PedidosAdmin(admin.ModelAdmin):
	list_display =('numero','fecha','cliente','total',)

class LineaPedidoAdmin(admin.ModelAdmin):
	list_display =('id','producto','precio','cantidad','pedido',)
	
admin.site.register(Clientes,ClientesAdmin)
admin.site.register(Productos,ProductosAdmin)
admin.site.register(Pedidos,PedidosAdmin)
admin.site.register(LineaPedido,LineaPedidoAdmin)
