<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!--  <div id="panier" style="display: none"> -->
<link rel="stylesheet" type="text/css" href="resources/css/style.css"></link>
<div id="panier" class="cadre1">
<h3>Votre Panier</h3>
	<c:if test="${panier.size!=0}">
		<table >
			<tr>
				<th>ID</th>
				<th>Désignation</th>
				<th>Prix</th>
				<th>Quantité</th>
				<th>Montant</th>
			</tr>
			<c:forEach items="${panier.items}" var="art">
				<tr>
					<td>${art.produit.idProduit}</td>
					<td>${art.produit.designation}</td>
					<td>${art.produit.prix}</td>
					<td>${art.quantite}</td>
					<td>${art.quantite*art.produit.prix}</td>
				</tr>
			</c:forEach>
			<tr>
				<td colspan="4">Total</td>
				<td>${panier.total}</td>
			</tr>
		</table>
	</c:if>
</div>
<div id="catalogueProduits">
	<c:forEach items="${produits}" var="p">
		<div class="cadre">
			<table>
				<tr>
					<td colspan="2"><img alt=""
						src="photoProduit?idP=${p.idProduit }" height="100px" width="100px"></td>
				</tr>
				<tr>
					<td>Désignation :</td>
					<td>${p.designation }</td>
				</tr>
				<tr>
					<td>Prix :</td>
					<td>${p.prix}</td>
				</tr>
				<tr>
					<td>Stock:</td>
					<td>${p.quantite}</td>
				</tr>
				<tr>
					<td>${p.description }</td>
				</tr>
				<tr>
					<td colspan="2">
				<tr>
					<td colspan="2">
						<form action="ajouterAuPanier">
							<input type="hidden" value="${p.idProduit}" name="idProduit">
							<input type="text" value="1" name="quantite"> 
							<input type="submit" value="Ajouter au panier">
						</form>
					<td>
				</tr>
			</table>
		</div>
	</c:forEach>
</div>