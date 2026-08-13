$headers = @{apikey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndldWF1c210aGJuZnFtb3d0am9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MzU0NTMsImV4cCI6MjEwMTUxMTQ1M30.SASFROP-ib89aEA8-pXO3u4VQUVy6jXI6_hX_SNNkuM'; Authorization='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndldWF1c210aGJuZnFtb3d0am9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MzU0NTMsImV4cCI6MjEwMTUxMTQ1M30.SASFROP-ib89aEA8-pXO3u4VQUVy6jXI6_hX_SNNkuM'}

$rows = Invoke-RestMethod -Method Get -Uri 'https://weuausmthbnfqmowtjoc.supabase.co/rest/v1/registros?select=*&order=created_at.asc' -Headers $headers

if (-not (Test-Path -Path "exports")) { New-Item -ItemType Directory -Path "exports" | Out-Null }

$out = $rows | ForEach-Object {
    [PSCustomObject]@{
        ID = $_.id
        Fecha = (Get-Date $_.created_at).ToString('dd/MM/yyyy HH:mm')
        Nombre = $_.nombre
        Pais = $_.pais
        Empresa = $_.empresa
        Email = $_.email
        Telefono = $_.telefono
        Necesidad = ($_.necesidad -replace "`r|`n", ' ')
        Ofrecimiento = ($_.ofrecimiento -replace "`r|`n", ' ')
        'Mesa #' = $_.mesa_numero
        'Mesa Pais' = $_.mesa_pais
        'Mesa Bandera' = $_.mesa_bandera
    }
}

$out | Export-Csv -Path "exports\registros-ordenado.csv" -NoTypeInformation -Encoding UTF8
Write-Output "EXPORT_OK"
