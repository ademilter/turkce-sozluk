const parseResult = result => {
  const parsed = {
    id: result.madde_id,
    telaffuz: result.telaffuz ?? undefined,
    lisan: result.lisan ?? undefined,
    birlesikler: result.birlesikler
      ? result.birlesikler.split(', ').map(b => ({ title: b, id: b }))
      : [],
    atasozu: (result.atasozu ?? []).map(a => ({
      id: a.madde_id,
      title: a.madde,
    })),
    anlamlar: (result.anlamlarListe ?? []).map(a => ({
      id: a.anlam_id,
      anlam_sira: a.anlam_sira,
      anlam: a.anlam,
      ozellik: a.ozelliklerListe
        ? a.ozelliklerListe.map(o => o.tam_adi).join(', ')
        : 'isim',
      ornek: (a.orneklerListe ?? []).map(o => ({
        id: o.ornek_id,
        ornek: o.ornek,
        yazar: (o.yazar ?? []).map(y => y.tam_adi).join(', '),
      })),
    })),
  }
  return parsed
}

export default parseResult
