export interface DogApiResponse {
    breeds: Breed[]; // Lista de raças associadas à imagem
    id: string; // ID da imagem
    url: string; // URL da imagem
    width: number; // Largura da imagem
    height: number; // Altura da imagem
  }
  
  export interface Breed {
    weight: {
      imperial: string;
      metric: string;
    };
    height: {
      imperial: string;
      metric: string;
    };
    id: number;
    name: string; // Nome da raça
    bred_for?: string; // Finalidade da criação da raça
    breed_group?: string; // Grupo da raça
    life_span: string; // Expectativa de vida
    temperament: string; // Temperamento do cão
    reference_image_id: string; // ID da imagem de referência da raça
    country_code?: string; // Código do país de origem da raça (opcional)
  }