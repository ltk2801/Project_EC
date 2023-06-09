﻿-- PROCEDURE
CREATE 
--ALTER
PROC ADD_PROD(
	@NAME NVARCHAR(80),
	@INFOR NVARCHAR(200),
	@QUANTITY INT,
	@PRICE INT
)
AS
BEGIN TRANSACTION
	BEGIN TRY
		IF(EXISTS(SELECT *
				  FROM PRODUCTS
				  WHERE NAME = @NAME))
		BEGIN
			ROLLBACK TRANSACTION
			RETURN 1
		END
	END TRY

	BEGIN CATCH
		PRINT(N'THÔNG TIN NHẬP VÀO ĐÃ TỒN TẠI')
	END CATCH

	DECLARE @ID INT
	SELECT @ID = (ID_PRODUCTS) + 1 FROM PRODUCTS
									  WHERE (ID_PRODUCTS) + 1 NOT IN (SELECT ID_PRODUCTS FROM PRODUCTS)

	INSERT INTO PRODUCTS VALUES (@ID,@NAME,@INFOR,GETDATE(),@QUANTITY,@PRICE)
COMMIT TRANSACTION

CREATE
--ALTER
PROC REMOVE_PROD(
	@ID_PRODUCTS INT
)
AS
BEGIN TRANSACTION
	BEGIN TRY
		IF(NOT EXISTS(SELECT *
					  FROM PRODUCTS
					  WHERE ID_PRODUCTS = @ID_PRODUCTS))
		BEGIN
			ROLLBACK TRANSACTION
			RETURN 1
		END
	END TRY

	BEGIN CATCH
		PRINT(N'THÔNG TIN NHẬP VÀO KHÔNG TỒN TẠI')
	END CATCH

	DELETE CART
	WHERE ID_PRODUCTS = @ID_PRODUCTS

	DELETE EXCHANGE_POINT
	WHERE ID_PRODUCTS = @ID_PRODUCTS

	DELETE FEEDBACK
	WHERE ID_PRODUCTS = @ID_PRODUCTS

	DELETE HISTORY
	WHERE ID_PRODUCTS = @ID_PRODUCTS

	DELETE TYPE_PRODUCTS
	WHERE ID_PRODUCTS = @ID_PRODUCTS

	DELETE PRODUCTS
	WHERE ID_PRODUCTS = @ID_PRODUCTS
COMMIT TRANSACTION
