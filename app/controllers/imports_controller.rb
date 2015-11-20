class ImportsController < ApplicationController
  before_action :set_import, only: [:show, :edit, :update, :destroy]

  # GET /imports
  # GET /imports.json
  def index
    @imports = Import.all
  end

  # GET /imports/1
  # GET /imports/1.json
  def show
  end

  # GET /imports/new
  def new
    @import = Import.new
  end

  # GET /imports/1/edit
  def edit
  end

  # POST /imports
  # POST /imports.json
  def create
    @import = Import.new(import_params)

    respond_to do |format|
      if @import.save
        format.html { redirect_to reconcile_import_path(@import), notice: 'Import was successfully created.' }
        format.json { render :show, status: :created, location: @import }
      else
        format.html { render :new }
        format.json { render json: @import.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /imports/1
  # PATCH/PUT /imports/1.json
  def update
    respond_to do |format|
      if @import.update(import_params)
        format.html { redirect_to reconcile_import(@import), notice: 'Import was successfully updated.' }
        format.json { render :show, status: :ok, location: @import }
      else
        format.html { render :edit }
        format.json { render json: @import.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /imports/1
  # DELETE /imports/1.json
  def destroy
    @import.destroy
    respond_to do |format|
      format.html { redirect_to imports_url, notice: 'Import was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  MAX_ROWS = 200

  def reconcile
    @sagepay_transactions = (1..MAX_ROWS).map do |num|
      rfq_ref = "P#{(rand * 1_000_000).round}"
      letter = ("B".."G").to_a.sample

      {
        id:                "s_#{num}",
        source:            "SagePay",
        type:              "Payment",
        contact_name:      "Mr Test Tester",
        rfq_reference:     rfq_ref,
        date:              Date.current.strftime("%d/%m/%Y"),
        payment_reference: "A#{letter}_#{rfq_ref}_REN_20150101012345_4444_C",
        status:            ["Unmatched", "Partial", "Query"].sample,
        total:             rand * 100,
      }
    end

    @chopin_transactions = (1..MAX_ROWS).map do |num|
      rfq_ref = "P#{(rand * 1_000_000).round}"
      letter = ("B".."G").to_a.sample

      {
        id:                "c_#{num}",
        source:            "Chopin",
        type:              "Payment",
        contact_name:      "Mr Test Tester",
        rfq_reference:     rfq_ref,
        date:              Date.current.strftime("%d/%m/%Y"),
        payment_reference: "A#{letter}_#{rfq_ref}_REN_20150101012345_4444_C",
        status:            ["Unmatched", "Partial", "Query"].sample,
        total:             rand * -100,
      }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_import
      @import = Import.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def import_params
      params[:import]
    end
end
